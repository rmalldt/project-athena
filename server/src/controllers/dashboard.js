async function dashboard(req, res) {
  try {
    console.log('USER: ', req.user);
    res.status(200).json({ success: true, data: 'Dashboard' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  dashboard,
};
