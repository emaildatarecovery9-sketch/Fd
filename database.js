const mongoose = require('mongoose');

// User (کاربر)
const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  name: String,
  avatar: String,
  bio: String,
  email: { type: String, unique: true, required: true },
  phone: { type: String },
  contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group' }],
  channels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Channel' }],
  notifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Notification' }],
  createdAt: { type: Date, default: Date.now }
});

// Post (پست)
const PostSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: String,
  image: String,
  file: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  channel: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  createdAt: { type: Date, default: Date.now }
});

// Comment (کامنت)
const CommentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  content: String,
  createdAt: { type: Date, default: Date.now }
});

// Message (پیام)
const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // For private chat
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }, // For group chat
  content: String,
  file: { type: mongoose.Schema.Types.ObjectId, ref: 'File' },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

// Group (گروه)
const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: String,
  description: String,
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  createdAt: { type: Date, default: Date.now }
});

// Channel (کانال)
const ChannelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: String,
  description: String,
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  subscribers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
  createdAt: { type: Date, default: Date.now }
});

// Notification (اعلان)
const NotificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String }, // post, message, comment, like, etc.
  content: String,
  link: String,
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// File (فایل و مدیا)
const FileSchema = new mongoose.Schema({
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fileName: String,
  fileType: String,
  fileSize: Number,
  url: String,
  createdAt: { type: Date, default: Date.now }
});

// مدل‌ها را به صورت ماژول اکسپورت کنید
module.exports = {
  User: mongoose.model('User', UserSchema),
  Post: mongoose.model('Post', PostSchema),
  Comment: mongoose.model('Comment', CommentSchema),
  Message: mongoose.model('Message', MessageSchema),
  Group: mongoose.model('Group', GroupSchema),
  Channel: mongoose.model('Channel', ChannelSchema),
  Notification: mongoose.model('Notification', NotificationSchema),
  File: mongoose.model('File', FileSchema)
};