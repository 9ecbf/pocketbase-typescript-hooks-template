/// <reference path="../types/pocketbase.d.ts" />

/**
 * This middleware will accept only the requests from this host
 * to the paths starting with `/api/v2/internal/`.
 *
 * @group v2
 */
function internalRequestGuard(next: echo.HandlerFunc): echo.HandlerFunc {
    return (c) => {
        const request = c.request();
        const isInternalRequest =
            request.url?.path?.startsWith('/api/v2/internal/');
        const isNotFromThisHost = !/^127\.0\.0\.1(:\d+)?$/.test(
            request.remoteAddr,
        );
        if (isInternalRequest && isNotFromThisHost) {
            throw new UnauthorizedError(
                'This resource can be accessed only from internal services.',
            );
        }
        next(c);
    };
}

/**
 * This middleware will accept only the requests with Admin-authenticated
 * token to the paths starting with `/api/v2/admin/`.
 *
 * @group v2
 */
function adminRequestGuard(next: echo.HandlerFunc): echo.HandlerFunc {
    return (c) => {
        const request = c.request();
        const isAdminRequest = request.url?.path?.startsWith('/api/v2/admin/');
        const isNotAdmin = !$apis.requestInfo(c).admin;
        if (isAdminRequest && isNotAdmin) {
            throw new UnauthorizedError(
                'Only administrators can access this resource.',
            );
        }
        next(c);
    };
}

routerUse($apis.activityLogger($app));
routerUse(adminRequestGuard);
routerUse(internalRequestGuard);
