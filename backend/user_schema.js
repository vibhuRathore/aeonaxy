const { z } = require("zod");

const userSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  username: z
    .string()
    .trim()
    .min(1, "Username is required")
    .regex(
      /^[A-Za-z0-9._-]+$/,
      "Username can only contain uppercase/lowercase letters, numbers, ., _, and -"
    ),
  email: z
    .string()
    .trim()
    .email("Invalid email format")
    .min("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  image_url: z.string().trim().url().optional(),
  location: z.string().trim().optional(),
  user_type: z.array(z.enum(["DESIGNER", "RECRUITER", "EXPLORER"])).optional(),
});

module.exports = { userSchema };
