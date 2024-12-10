export const getProfile = async (req, res) => {
    try {
        const { email, id } = req.user; 
        return res.status(200).json({
            ok: true,
            status: 200,
            message: "Perfil del usuario autenticado",
            payload: { email, id },
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            status: 500,
            message: "Error al obtener el perfil",
            payload: { detail: error.message },
        });
    }
};
