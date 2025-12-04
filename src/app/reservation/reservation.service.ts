import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private reservations: Reservation[] = [];

  constructor() {
    this.loadReservations();
  }

  loadReservations(): void {
    let savedReservations = localStorage.getItem("jzsus_hotel_app")
    this.reservations = savedReservations ? JSON.parse(savedReservations) : [];
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find(res => res.id === id);
  }

  addReservation(reservation: Reservation): void {
    reservation.id = Date.now().toString();
    this.reservations.push(reservation);
    localStorage.setItem("jzsus_hotel_app", JSON.stringify(this.reservations));
  }

  deleteReservation(id: string): void {
    let index = this.reservations.findIndex(res => res.id === id);
    this.reservations.splice(index, 1)
    localStorage.setItem("jzsus_hotel_app", JSON.stringify(this.reservations));
  }

  updateReservation(id: string, updatedReservation: Reservation): void {
    let index = this.reservations.findIndex(res => res.id === id);
    updatedReservation.id = id;
    this.reservations[index] = updatedReservation;
    localStorage.setItem("jzsus_hotel_app", JSON.stringify(this.reservations));
  }

}
