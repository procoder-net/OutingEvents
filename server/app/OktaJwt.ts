const OktaJwtVerifier = require("@okta/jwt-verifier");
const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: process.env.OKTA_AUTH_ISSUER,
  clientId: process.env.OKTA_AUTH_CLIENTID,
  assertClaims: {
    cid: process.env.OKTA_AUTH_CLIENTID
  }
});

/**
 * A simple middleware that asserts valid access tokens and sends 401 responses
 * if the token is not present or fails validation.  If the token is valid its
 * contents are attached to req.jwt
 */
function authenticationRequired(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization || "";
  const match = authHeader.match(/Bearer (.+)/);

  if (!match) {
    res.status(401);
    return next("Unauthorized");
  }

  const accessToken = match[1];

  return oktaJwtVerifier
    .verifyAccessToken(accessToken)
    .then((jwt: any) => {
      req.jwt = jwt;
      next();
    })
    .catch((err: any) => {
      res.status(401).send(err.message);
    });
}

export default authenticationRequired;
