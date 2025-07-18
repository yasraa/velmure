import Subscriber from "../models/subscriber.js";
const subuser = async(req, res) => {
  const { name, email } = req.body;
  console.log("Incoming subscriber:", req.body); // 👈 log here

  if (!name || !email) {
    return res.status(400).json({ message: 'Please fill in all fields' });
  }

  try {
    const newUser = new Subscriber({ name, email });
    await newUser.save();
    res.status(201).json({ message: '✅ Subscribed successfully!' }); // ✅ return something
  } catch (err) {
    console.error('❌ Error in subscriber controller:', err); // 👈 this helps a lot
    res.status(500).json({ message: 'Something went wrong on the server' });
  }
};

export {subuser}