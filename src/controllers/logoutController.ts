import { Request, Response, NextFunction } from 'express';
import Token from "../models/token";

const logout = async (req: Request,res: Response,next: NextFunction) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")

    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    console.log(token)
    await Token.create({token : token}).then(data => {
        res.status(200).send(data)
    })
        .catch(err => {
            res.status(500).send(err ? err : 'something went wrong during this operation')
        })

}
export default logout