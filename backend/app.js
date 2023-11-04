import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 3333;
import dotenv from "dotenv";
dotenv.config();

import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running,and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

app.post("/auth/login", async (req, res) => {
  console.log(req.headers.authorization);
  const tokenId = req.headers.authorization;
  const ticket = await client.verifyIdToken({
    idToken: tokenId.slice(7),
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  console.log(payload);
  if (payload.aud != process.env.GOOGLE_CLIENT_ID)
    return res.send("Unauthorised");
  const { email, name } = payload;
  const authToken = jwt.sign({ email, name }, process.env.SECRET);

  res.json({ authToken });
});

app.post("/access", async (req, res) => {
  try {
    const authToken = req.headers.authorization;
    const decoded = jwt.verify(authToken.slice(7), process.env.SECRET);
  } catch (e) {
    return res.json({ data: "NOT Authorised" });
  }
  res.json({ data: "Authorised" });
});
