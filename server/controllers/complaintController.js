import Complaint from "../models/Complaint.js";

export const getComplaints = async (req, res) => {
  const complaints = await Complaint.find();
  res.json(complaints);
};

export const createComplaint = async (req, res) => {
  const complaint = await Complaint.create(req.body);
  res.status(201).json(complaint);
};

export const updateComplaint = async (req, res) => {
  const updated = await Complaint.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

export const deleteComplaint = async (req, res) => {
  await Complaint.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};