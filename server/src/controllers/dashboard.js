async function dashboard(req, res) {
  try {
    res.status(200).json({ success: true, data: 'Dashboard' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  dashboard,
};
