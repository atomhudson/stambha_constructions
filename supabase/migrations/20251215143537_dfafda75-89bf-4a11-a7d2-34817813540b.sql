-- Create app_role enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'viewer');

-- Create user_roles table for role-based access
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'viewer',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create materials table for brands/products
CREATE TABLE public.materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    brand TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Materials are viewable by everyone"
ON public.materials
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage materials"
ON public.materials
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Create unique_features table
CREATE TABLE public.unique_features (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.unique_features ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Features are viewable by everyone"
ON public.unique_features
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage features"
ON public.unique_features
FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Insert sample materials
INSERT INTO public.materials (name, brand, category, description) VALUES
('Premium Cement', 'UltraTech', 'Cement', 'High-quality Portland cement for structural strength'),
('Steel Bars', 'TATA Tiscon', 'Steel', 'TMT steel bars for reinforced construction'),
('Ceramic Tiles', 'Kajaria', 'Tiles', 'Premium ceramic tiles for flooring and walls'),
('Sanitaryware', 'Kohler', 'Bathroom', 'Luxury bathroom fixtures and fittings'),
('Paints', 'Asian Paints', 'Finishing', 'Weather-proof exterior and interior paints'),
('Electrical', 'Havells', 'Electrical', 'Premium switches and wiring solutions');

-- Insert unique features
INSERT INTO public.unique_features (title, description, icon) VALUES
('50+ Years Legacy', 'Three generations of construction expertise passed down through family tradition', 'crown'),
('Zero Compromise Quality', 'We use only premium materials from trusted brands for lasting durability', 'shield-check'),
('On-Time Delivery', '95% of our projects are completed within the promised timeline', 'clock'),
('Transparent Pricing', 'Detailed quotations with no hidden costs - what you see is what you pay', 'wallet'),
('5-Year Warranty', 'Comprehensive warranty on structural work and premium finishes', 'badge-check'),
('Personal Supervision', 'Direct oversight by experienced family members on every project', 'eye');