import mongoose from 'mongoose';

declare global {
  // This declares a global variable named `mongoose` on the `global` object.
  // We use `var` to allow this declaration to be merged.
  var mongoose: {
    promise: Promise<typeof mongoose> | null;
    conn: typeof mongoose | null;
  };
}