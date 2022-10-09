import { BigInt, log } from "@graphprotocol/graph-ts";
import {
  BillionDollarCanvas,
  Approval,
  ApprovalForAll,
  Transfer,
  MintCanvas,
  BuyCanvas,
  ChangeCanvasURI,
  ChangePrice,
} from "../generated/BillionDollarCanvas/BillionDollarCanvas";
import { sendEPNSNotification } from "./EPNSNotification";

import { refreshPixel } from "./utils/refreshPixel";

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleTransfer(event: Transfer): void {}

export function handleBuyCanvas(event: BuyCanvas): void {
  log.info("Bought {}", [event.params.canvasId.toString()]);

  refreshPixel(event.params.canvasId, event.address);
}

export function handleChangeCanvasURI(event: ChangeCanvasURI): void {
  log.info("Changed canvas uri {}", [event.params.canvasId.toString()]);

  refreshPixel(event.params.canvasId, event.address);
}

export function handleChangePrice(event: ChangePrice): void {
  log.info("Changed price {}", [event.params.canvasId.toString()]);

  refreshPixel(event.params.canvasId, event.address);
}

export function handleMintCanvas(event: MintCanvas): void {
  log.info("Minted {}", [event.params.canvasId.toString()]);

  const pixel = refreshPixel(event.params.canvasId, event.address);

  const recipient = pixel.owner;
  const type = "3";
  const title = "PUSH Received";
  const body = `Minted new pixel`;
  const image =
    "https://play-lh.googleusercontent.com/i911_wMmFilaAAOTLvlQJZMXoxBF34BMSzRmascHezvurtslYUgOHamxgEnMXTklsF-S";
  const secret = "null";
  const cta = "https://epns.io/";

  const notification = `{
    "type": "${type}",
    "title": "${title}",
    "body": "${body}",
    "subject": "Minted new pixel",
    "message": "Minted new pixel",
    "image": "${image}",
    "secret": "${secret}",
    "cta": "${cta}",
  }`;

  sendEPNSNotification(recipient, notification);
}
