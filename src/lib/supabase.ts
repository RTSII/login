// Mock Supabase client for preview
export const supabase = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null } }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithPassword: ({ email, password }: { email: string; password: string }) => {
      // Mock authentication - in real app this would connect to Supabase
      if (email && password) {
        return Promise.resolve({ data: { user: { id: '1', email } }, error: null });
      }
      return Promise.resolve({ data: { user: null }, error: { message: 'Invalid credentials' } });
    },
    signUp: () => Promise.resolve({ data: { user: null }, error: null }),
    signOut: () => Promise.resolve({ error: null }),
  },
  from: () => ({
    select: () => ({
      eq: () => ({
        single: () => Promise.resolve({ data: null, error: null })
      })
    }),
    insert: () => Promise.resolve({ error: null }),
    update: () => ({
      eq: () => ({
        select: () => ({
          single: () => Promise.resolve({ data: null, error: null })
        })
      })
    })
  })
};