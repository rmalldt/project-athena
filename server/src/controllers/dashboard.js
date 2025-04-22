async function dashboard(req, res) {
  if (!req.user) {
    return res.status(403).json({ error: 'Not Authenticated' });
  }

  const user = req.user;
  try {
    console.log('USER: ', req.user);
    res.status(200).json({
      success: true,
      data: {
        student_id: user.student_id,
        username: user.username,
        email: user.email,
      },
      message: 'Dashboard',
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  dashboard,
};
