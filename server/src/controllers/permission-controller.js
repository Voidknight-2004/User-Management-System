import permissionModel from "../postgresql/schema/permissionSchema.js";
import roleModel from "../postgresql/schema/rolesSchema.js";

const getPerms = async (req, res) => {
  try {
    const { role } = req.params;
    const rolesInstance = await roleModel.findOne({
      where: {
        role: role,
      },
      include: [
        {
          model: permissionModel,
          as: "Permissions",
          attributes: ["permId", "permissions"],
          through: { attributes: [] },
        },
      ],
    });
    if (rolesInstance) res.status(201).send(rolesInstance);
    else res.status(404).send("Permissions could not be fetched!");
  } catch (err) {
    console.log(err);
  }
};

const permissionController = {
  getPerms,
};
export default permissionController;
