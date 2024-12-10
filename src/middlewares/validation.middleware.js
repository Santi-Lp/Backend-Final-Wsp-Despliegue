export const validateRegister = (req, res, next) => {
    const { name, email, password, number } = req.body;
    if (!name || !email || !password || !number) {
        return res.status(400).json({
            ok: false,
            status: 400,
            message: "Todos los campos son obligatorios",
        });
    }
    if (password.length < 6) {
        return res.status(400).json({
            ok: false,
            status: 400,
            message: "La contraseña debe tener al menos 6 caracteres",
        });
    }
    next();
};

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            ok: false,
            status: 400,
            message: "El email y la contraseña son obligatorios",
        });
    }
    next();
};
