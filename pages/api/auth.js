import { supabase } from '../../lib/supabaseClient';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { type, username, password } = req.body;

    try {
      if (type === 'signup') {
        // Check if the username already exists
        const { data: existingUser, error: checkError } = await supabase
          .from('admin_panel')
          .select('*')
          .eq('username', username);

        if (checkError) {
          return res.status(400).json({ message: 'Error checking username.' });
        }

        if (existingUser.length > 0) {
          return res.status(400).json({ message: 'Username already exists.' });
        }

        // Insert new user into the admin_panel table
        const { error: insertError } = await supabase
          .from('admin_panel')
          .insert([{ username, password }]);

        if (insertError) {
          return res.status(400).json({ message: insertError.message });
        }

        return res.status(200).json({ message: 'Signup successful!' });
      }

      if (type === 'login') {
        // Find user by username
        const { data: userData, error: fetchError } = await supabase
          .from('admin_panel')
          .select('*')
          .eq('username', username)
          .single();

        if (fetchError || !userData || userData.password !== password) {
          return res.status(400).json({ message: 'Invalid credentials.' });
        }

        // Create a JWT token
        const token = jwt.sign({ username: userData.username }, process.env.JWT_SECRET, {
          expiresIn: '7d',
        });

        // Set the token as a cookie
        res.setHeader('Set-Cookie', `token=${token}; Path=/; HttpOnly; Max-Age=604800;`);
        return res.status(200).json({ message: 'Login successful!' });
      }

      return res.status(405).json({ message: 'Method not allowed' });
    } catch (err) {
      // Log the error if necessary
      console.error('Error during authentication:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
