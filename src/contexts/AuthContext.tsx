
import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: any | null;
  isLoading: boolean;
  signUp: (email: string, password: string, userData?: { full_name?: string }) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  autoLogin: () => Promise<void>;
};

const DEV_EMAIL = "johndoe@gmail.com";
 const DEV_PASSWORD = "Johndoe@2025";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile in a separate callback to avoid deadlocks
          setTimeout(() => {
            fetchUserProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
        
        if (event === 'SIGNED_OUT') {
          setProfile(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }
      
      setProfile(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const autoLogin = async () => {
    try {
      setIsLoading(true);
       const { error } = await supabase.auth.signInWithPassword({
         email: DEV_EMAIL,
         password: DEV_PASSWORD,
       });

       if (error) {
        // If login fails (e.g., user doesn't exist), try to create the user
        const { error: signUpError } = await supabase.auth.signUp({
          email: DEV_EMAIL,
          password: DEV_PASSWORD,
          options: {
            data: {
              full_name: "John Doe"
            }
          }
        });

        if (signUpError) throw signUpError;
        
        // Log in with the newly created account
        await supabase.auth.signInWithPassword({
          email: DEV_EMAIL,
          password: DEV_PASSWORD,
        });
      }
      
      toast.success('Development login successful');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Error with development login');
     } finally {
       setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData?: { full_name?: string }) => {
    // In development mode, just use autoLogin instead
    return autoLogin();
  };

  const signIn = async (email: string, password: string) => {
    // In development mode, just use autoLogin instead
    return autoLogin();
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'Error signing out');
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        isLoading,
        signUp,
        signIn,
        signOut,
        autoLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
