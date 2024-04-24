
const res_msg = ({ res, code, msg, ...rest }) => res.status(500).json({ msg: msg, code, ...rest });

const server_err = ({ res, error }) => res.status(500).json({ msg: 'Internal server error', error, code: 500 })

export { server_err, res_msg }