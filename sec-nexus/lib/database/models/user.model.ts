
import { Schema, model, models, Model } from 'mongoose';

interface IUser {
  clerkId: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
  role: 'student' | 'faculty' | 'management';
  studentDetails?: {
    department?: Schema.Types.ObjectId;
    club?: Schema.Types.ObjectId;
    clubRole?: string;
    semester?: number;
    isCR?: boolean;
  };
}

const StudentDetailsSchema = new Schema({
  department: { type: Schema.Types.ObjectId, ref: 'Department' },
  club: { type: Schema.Types.ObjectId, ref: 'Club' },
  clubRole: { type: String },
  semester: { type: Number },
  isCR: { type: Boolean, default: false },
}, { _id: false });

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  photo: { type: String },
  role: {
    type: String,
    enum: ['student', 'faculty', 'management'],
    required: true,
    default: 'student'
  },
  studentDetails: StudentDetailsSchema,
});

// Validation: A student cannot have both department and club
UserSchema.pre('validate', function(next) {
  if (this.role === 'student' && this.studentDetails) {
    const { department, club } = this.studentDetails;
    if (department && club) {
      return next(new Error('A student cannot have both department and club'));
    }
    // If club is present, clubRole is required
    if (club && !this.studentDetails.clubRole) {
      return next(new Error('clubRole is required when club is specified'));
    }
    // If department is present, isCR is required
    if (department && this.studentDetails.isCR === undefined) {
      return next(new Error('isCR is required when department is specified'));
    }
  }
  next();
});

const User = models.User || model<IUser>('User', UserSchema);

export default User;
