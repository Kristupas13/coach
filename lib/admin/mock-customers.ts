// Visual-only mock data for the admin "Klientai" tab. Not backed by the
// database — swap for a real `purchases`/`subscriptions` table later.
export type MockCustomer = {
  id: string
  name: string
  email: string
  trainingType: string
  purchasedAt: string
  status: 'aktyvus' | 'baigėsi'
}

export const MOCK_CUSTOMERS: MockCustomer[] = [
  { id: '1', name: 'Tomas Kazlauskas', email: 'tomas.kazlauskas@gmail.com', trainingType: 'Asmeninės treniruotės', purchasedAt: '2026-08-01', status: 'aktyvus' },
  { id: '2', name: 'Ieva Petrauskaitė', email: 'ieva.petrauskaite@gmail.com', trainingType: 'Asmeninės treniruotės', purchasedAt: '2026-07-28', status: 'aktyvus' },
  { id: '3', name: 'Mantas Urbonas', email: 'mantas.urbonas@gmail.com', trainingType: 'Grupinės treniruotės', purchasedAt: '2026-07-15', status: 'aktyvus' },
  { id: '4', name: 'Gabija Šimkutė', email: 'gabija.simkute@gmail.com', trainingType: 'Asmeninės treniruotės', purchasedAt: '2026-07-10', status: 'aktyvus' },
  { id: '5', name: 'Dovydas Petkevičius', email: 'dovydas.petkevicius@gmail.com', trainingType: 'Asmeninės treniruotės', purchasedAt: '2026-06-22', status: 'baigėsi' },
  { id: '6', name: 'Austėja Rimkutė', email: 'austeja.rimkute@gmail.com', trainingType: 'Online konsultacijos', purchasedAt: '2026-06-18', status: 'aktyvus' },
  { id: '7', name: 'Lukas Adomaitis', email: 'lukas.adomaitis@gmail.com', trainingType: 'Asmeninės treniruotės', purchasedAt: '2026-06-05', status: 'aktyvus' },
  { id: '8', name: 'Kamilė Vasiliauskaitė', email: 'kamile.vasiliauskaite@gmail.com', trainingType: 'Asmeninės treniruotės', purchasedAt: '2026-05-30', status: 'baigėsi' },
  { id: '9', name: 'Nojus Butkus', email: 'nojus.butkus@gmail.com', trainingType: 'Grupinės treniruotės', purchasedAt: '2026-05-19', status: 'aktyvus' },
  { id: '10', name: 'Emilija Jankauskaitė', email: 'emilija.jankauskaite@gmail.com', trainingType: 'Asmeninės treniruotės', purchasedAt: '2026-05-12', status: 'aktyvus' },
  { id: '11', name: 'Rokas Stankevičius', email: 'rokas.stankevicius@gmail.com', trainingType: 'Asmeninės treniruotės', purchasedAt: '2026-04-27', status: 'baigėsi' },
  { id: '12', name: 'Ugnė Balčiūnaitė', email: 'ugne.balciunaite@gmail.com', trainingType: 'Online konsultacijos', purchasedAt: '2026-04-14', status: 'baigėsi' },
]
