import Asset from "../models/Asset.js";

export const getAssets = async (req, res) => {
  const assets = await Asset.find();
  res.json(assets);
};

export const createAsset = async (req, res) => {
  const asset = await Asset.create(req.body);
  res.status(201).json(asset);
};

export const deleteAsset = async (req, res) => {
  await Asset.findByIdAndDelete(req.params.id);
  res.json({ message: "Asset deleted" });
};