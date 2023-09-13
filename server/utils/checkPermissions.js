import { UnAuthenticatedError } from "../errors/index.js";

const checkPermissions = (requestUser, resourceUserId) => {
    if(requestUser.userId === resourceUserId.toString()) {
        return // permission is ok
    }
    throw new UnAuthenticatedError('Not authorized to access this route') // else permission isn't ok
    
}

export default checkPermissions