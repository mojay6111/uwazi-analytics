-- Seed known MDAs from OAG 2023/2024 report
INSERT INTO mdas (name, short_name, category, parent_ministry) VALUES
('The National Treasury', 'Treasury', 'Ministry', 'The National Treasury'),
('State Department for Foreign Affairs', 'Foreign Affairs', 'State Department', 'Ministry of Foreign Affairs'),
('State Department for Petroleum', 'Petroleum', 'State Department', 'Ministry of Energy'),
('State Department for Medical Services', 'Medical Services', 'State Department', 'Ministry of Health'),
('Ministry of Defence', 'Defence', 'Ministry', 'Ministry of Defence'),
('Kenya National Highways Authority', 'KeNHA', 'Agency', 'Ministry of Roads'),
('National Hospital Insurance Fund', 'NHIF', 'Agency', 'Ministry of Health'),
('National Social Security Fund', 'NSSF', 'Agency', 'Ministry of Labour'),
('Kenya Airways Limited', 'KQ', 'State Enterprise', 'The National Treasury')
ON CONFLICT (name) DO NOTHING;
