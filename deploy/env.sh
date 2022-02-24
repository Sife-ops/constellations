#!/bin/sh

if stat ./.env 1>/dev/null 2>&1 ; then . ./.env ; fi

err() {
    echo 'Error: environment variables'
}

if [ -z $VITE_PROD_URL ] && [ -z $VITE_NGROK_URL ] ; then err ; exit 1 ; fi
# if [ -n $VITE_PROD_URL ] && [ -n $VITE_NGROK_URL ] ; then err ; exit 1 ; fi
if [ -z $SECRET_ACCESS_TOKEN ] ; then err ; exit 1 ; fi
if [ -z $SECRET_REFRESH_TOKEN ] ; then err ; exit 1 ; fi

