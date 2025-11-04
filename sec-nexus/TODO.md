# TODO: Add CR Selection Option in Event Form

## Tasks
- [x] Update event.model.ts: Change isCR to String enum ['yes', 'no'], default 'no'. Update interface.
- [x] Update validator.ts: Change isCR to z.enum(['yes', 'no']). Update refine to require isCR when department, allow 'no'.
- [x] Update constants.ts: Change eventDefaultValues isCR to 'no'.
- [x] Update types.ts: Add isCR to CreateEventParams and UpdateEventParams, change Event type isCR to 'yes' | 'no'.
- [x] Update event.actions.ts: Add isCR to createEvent and updateEvent functions.
- [x] Update EventForm.tsx: Change isCR FormField to radio buttons for 'Yes' or 'No'. Update mapEventToFormValues and initialValues.
- [ ] Test the form to ensure radio buttons work and validation is correct.
