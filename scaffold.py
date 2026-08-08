import os

pages = ['dashboard', 'agents', 'agents/[id]', 'missions', 'missions/[id]', 'orchestrator', 'memory', 'tools', 'security', 'approvals', 'audit', 'replay', 'analytics', 'settings']
base_path = 'src/app'

for p in pages:
    dir_path = os.path.join(base_path, p)
    os.makedirs(dir_path, exist_ok=True)
    title = p.replace('/[id]', '').title()
    content = f"export default function Page() {{\n  return (\n    <div className='p-8'>\n      <h1 className='text-3xl font-heading text-primary'>{title}</h1>\n    </div>\n  );\n}}"
    with open(os.path.join(dir_path, 'page.tsx'), 'w') as f:
        f.write(content)

print("Scaffold complete.")
