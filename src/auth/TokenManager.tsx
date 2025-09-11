const tokenKey = 'token';
const idKey='id';
const adminKey='isAdmin';
const tripPlanKey = 'tripPlan';
const modeKey='mode';
const cityKey = 'cityKey';
const dayKey = 'dayKey';

// Set the trip plan for the specific day
export function setTripPlan(plan: string[][]) {
  localStorage.setItem(tripPlanKey, JSON.stringify(plan));
}

// Get the trip plan from localStorage
export function getTripPlan(): string[][] {
  const stored = localStorage.getItem(tripPlanKey);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Error parsing tripPlan:", e);
    }
  }
  return [];
}

// Update the trip plan for a specific day
export function updateTripPlan(plan: string[][]) {
  setTripPlan(plan);
}

// Remove the trip plan from localStorage
export function removeTripPlan() {
  localStorage.removeItem(tripPlanKey);
}
export function setNumDays(dayValue?: string) {
    if (!dayValue) return;
    localStorage.setItem(dayKey, dayValue);
}
export function getDays(): string {
    return localStorage.getItem(dayKey) || '';
}
export function removeDays() {
    localStorage.removeItem(dayKey);
}
export function verifyDays(): boolean {
    return getDays().length > 0;
}
export function setCity(cityValue?: string) {
    if (!cityValue) return;
    localStorage.setItem(cityKey, cityValue);
}
export function getCity(): string {
    return localStorage.getItem(cityKey) || '';
}
export function verifyCity(): boolean {
    return getCity().length > 0;
}
export function removeCity() {
    localStorage.removeItem(cityKey);
}
export function setToken(tokenValue?: string) {
    if (!tokenValue) return;
    localStorage.setItem(tokenKey, tokenValue);
}
export function getToken(): string {
    return localStorage.getItem(tokenKey) || '';
}
export function removeToken() {
    localStorage.removeItem(tokenKey);
}
export function setUserID(idValue?: string) {
    if (!idValue) return;
    localStorage.setItem(idKey, idValue);
}
export function getUserID(): string {
    return localStorage.getItem(idKey) || '';
}

export function removeID() {
    localStorage.removeItem(idKey);
}
export function verifyToken(): boolean {
    return getToken().length > 0;
}
export function getAdmin(): string {
    return localStorage.getItem(adminKey) || '';
}
export function setAdmin(adminValue?: string) {
    if (!adminValue) return;
        localStorage.setItem(adminKey, adminValue);
}
export function removeAdmin() {
    localStorage.removeItem(adminKey);
}
export function isAdmin(): boolean {
    return getAdmin()==="yes";
}
export function setAdminRole(isAdmin: boolean): void {
    localStorage.setItem('isAdmin', isAdmin ? 'yes' : 'no');
}
export function setMode(modeValue?: string) {
    if (!modeValue) return;
        localStorage.setItem(modeKey, modeValue);
}
export function removeMode() {
    localStorage.removeItem(modeKey);
}
export function getMode(): string {
    return localStorage.getItem(modeKey) || '';
}
