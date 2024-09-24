import useAuthenticated from "@/hooks/useAuthenticated"

export default function BaseLayout({ children }: { children: React.ReactNode }) {
	useAuthenticated()

	return children
}
