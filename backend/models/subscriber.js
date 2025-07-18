import mongoose from 'mongoose';
const SubscriberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
    email: {
        type: String,
        required: true,
        unique: true
    },
  
})
const Subscriber = mongoose.model('Subscriber', SubscriberSchema);
export default Subscriber;