import { Address, BigInt, log } from "@graphprotocol/graph-ts";
import { BillionDollarCanvas } from "../../generated/BillionDollarCanvas/BillionDollarCanvas";
import { PixelEntity } from "../../generated/schema";

export const refreshPixel = (
  pixelId: BigInt,
  contractAddress: Address
): PixelEntity => {
  log.info("Refresh pixel with id: {}", [pixelId.toString()]);

  // get the pixel data
  const contract = BillionDollarCanvas.bind(contractAddress);
  const owner = contract.ownerOf(pixelId);
  const price = contract.priceOf(pixelId);
  const tokenUri = contract.tokenURI(pixelId);

  // Get pixel reference
  let pixel = PixelEntity.load(pixelId.toString());
  if (pixel == null) {
    pixel = new PixelEntity(pixelId.toString());
  }

  pixel.owner = owner.toHexString();
  pixel.price = price;
  pixel.tokenUri = tokenUri;

  pixel.save();

  return pixel;
};
