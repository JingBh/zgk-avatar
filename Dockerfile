# Before building this image,
# please run `yarn build` in the host
# to build a production bundle first.

FROM joseluisq/static-web-server:1

ENV SERVER_NAME="zgk-avatar-server" \
    SERVER_ROOT="/public" \
    SERVER_ASSETS="/public/assets"

ADD dist /public
