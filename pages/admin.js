import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import { supabase } from '../lib/supabaseClient';

// Server-side authentication to protect the admin panel
export const getServerSideProps = async (context) => {
  const { req } = context;
  const token = req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return {
      props: { user: decoded },
    };
  } catch {
    // You can log the error here if needed
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};

const AdminPanel = ({ user }) => {
  const [bio, setBio] = useState('');
  const [website, setWebsite] = useState('');
  const [editMode, setEditMode] = useState(false);

  // Fetch profile data when the component mounts
  useEffect(() => {
    const fetchProfileData = async () => {
      const { data, error } = await supabase
        .from('admin_panel')
        .select('bio, website')
        .eq('username', user.username)
        .single();

      if (data) {
        setBio(data.bio || '');
        setWebsite(data.website || '');
      }
      if (error) {
        console.error('Error fetching profile:', error.message);
      }
    };

    fetchProfileData();
  }, [user.username]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from('admin_panel')
      .update({ bio, website })
      .eq('username', user.username);

    if (error) {
      console.error('Error updating profile:', error.message);
    } else {
      setEditMode(false);
    }
  };

  return (
    <div>
      <h1>Welcome to the Admin Panel</h1>
      <p>Hello, {user.username}</p>

      <section>
        <h2>My Account</h2>
        {editMode ? (
          <form onSubmit={handleUpdate}>
            <label>
              Bio:
              <textarea 
                value={bio} 
                onChange={(e) => setBio(e.target.value)} 
                required 
              />
            </label>
            <label>
              Website URL:
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                required 
              />
            </label>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditMode(false)}>
              Cancel
            </button>
          </form>
        ) : (
          <div>
            <p><strong>Bio:</strong> {bio || 'No bio set yet'}</p>
            <p><strong>Website URL:</strong> {website || 'No website set yet'}</p>
            <button onClick={() => setEditMode(true)}>Edit</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminPanel;
