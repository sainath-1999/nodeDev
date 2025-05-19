# DevTInder APIs

## authRouter
- POST /signup
- POST /login
- POST /logout

## profileRouter
- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password   

## connectionRequestRouter
- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId
- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

## userRouter
- GET /connections
- GET /requests/received
- GET /feed - Gets yoou the profiles of other users on plaform

Status: ignore, interested, acccepeted, rejected