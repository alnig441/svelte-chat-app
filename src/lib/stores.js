import { writable } from 'svelte/store';
import { readable } from 'svelte/store';

export const  isLoggedIn = writable(false),
              rooms = writable([]),
              activeRoom = writable(null),
              clientIO = writable({}),
              roomAlert = writable([]),
              chatLog = writable([]),
              filtered = writable([])
