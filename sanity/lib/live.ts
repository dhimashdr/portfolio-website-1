import {defineLive} from 'next-sanity/live'
import {client} from './client'
import {token} from '../env'

export const {sanityFetch, SanityLive} = defineLive({
  client,
  serverToken: token,
  browserToken: false,
})