const Layout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#cde6f8] bg-dotted-pattern bg-cover bg-fixed bg-center">
      {children}
    </div>
  )
}

export default Layout

