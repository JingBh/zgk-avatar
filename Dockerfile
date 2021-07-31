# Before building this image,
# please run `yarn build` in the host
# to build a production bundle first.

FROM joseluisq/static-web-server:2

ENV SERVER_ROOT="/public" \
    SERVER_ASSETS="/public/assets"

ADD dist /public
