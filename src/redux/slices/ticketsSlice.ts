import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Ticket } from "interfaces/ticket";
import { User } from "interfaces/user";
import locationAPI from "services/locationAPI";
import ticketAPI from "services/ticketAPI";

interface TicketState {
  ticketsByUser: Ticket[];
  ticketDetail: Ticket;
  isTicketLoading: boolean;
  error: string;
}

const initialState: TicketState = {
  ticketsByUser: [],
  ticketDetail: {} as Ticket,
  isTicketLoading: false,
  error: "",
};

export const getTicketsByUser = createAsyncThunk(
  "tickets/getTicketsByUser",
  async ({ userId }: { userId: User["_id"] }, { dispatch }) => {
    try {
      const data = await ticketAPI.getTicketsByUser({ userId });

      return data;
    } catch (error) {
      throw error;
    }
  }
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTicketsByUser.pending, (state) => {
      return { ...state, isTicketLoading: true };
    });
    builder.addCase(getTicketsByUser.fulfilled, (state, { payload }) => {
      // TEST
      payload.forEach(async (ticket) => {
        if (ticket.roomId != null) {
          const location = await locationAPI.getLocationDetail(
            ticket.roomId?.locationId as string
          );

          ticket = {
            ...ticket,
            roomId: {
              ...ticket.roomId,
              locationId: location,
            },
          };
        }
      });

      return { ...state, isTicketLoading: false, ticketsByUser: payload };
    });
    builder.addCase(getTicketsByUser.rejected, (state, { error }) => {
      return {
        ...state,
        isTicketLoading: false,
        ticketsByUser: [],
        error: error.message as string,
      };
    });
  },
});

export default ticketsSlice.reducer;
