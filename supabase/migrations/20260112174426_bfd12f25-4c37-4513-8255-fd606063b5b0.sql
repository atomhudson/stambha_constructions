-- Add SELECT policy for inquiries table - only admins can view customer data
CREATE POLICY "Only admins can view inquiries"
ON public.inquiries
FOR SELECT
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Also add UPDATE and DELETE policies for admins to manage inquiries
CREATE POLICY "Admins can update inquiries"
ON public.inquiries
FOR UPDATE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete inquiries"
ON public.inquiries
FOR DELETE
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));