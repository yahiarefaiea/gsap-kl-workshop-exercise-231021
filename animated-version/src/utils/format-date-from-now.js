import moment from 'moment'

/**
 * get a human-readable string representation of the time elapsed from the
 * current moment to a given date or time.
 * @param {date} timestamp
 * @return {string}
 */
export default function formatDateFromNow(timestamp) {
  return moment(timestamp).fromNow()
}