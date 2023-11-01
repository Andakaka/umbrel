import {motion} from 'framer-motion'
import {Globe} from 'lucide-react'
import {useState} from 'react'
import {useTranslation} from 'react-i18next'
import {
	RiArrowUpCircleFill,
	RiCheckboxCircleFill,
	RiEqualizerLine,
	RiExpandRightFill,
	RiKeyLine,
	RiPulseLine,
	RiRefreshLine,
	RiRestartLine,
	RiShutDownLine,
	RiToolsLine,
	RiUserLine,
} from 'react-icons/ri'
import {Link, useNavigate} from 'react-router-dom'
import {useLocalStorage} from 'react-use'

import {ChevronDown} from '@/assets/chevron-down'
import {Card} from '@/components/ui/card'
import {Icon} from '@/components/ui/icon'
import {IconButton} from '@/components/ui/icon-button'
import {IconLinkButton} from '@/components/ui/icon-link-button'
import {links} from '@/constants/links'
import {DesktopPreview, DesktopPreviewFrame} from '@/modules/desktop/desktop-preview'
import {Button} from '@/shadcn-components/ui/button'
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/shadcn-components/ui/dropdown-menu'
import {Switch} from '@/shadcn-components/ui/switch'
import {linkClass} from '@/utils/element-classes'
import {fixmeHandler} from '@/utils/misc'

import {CardProgressStat, CardTempStat} from './cards'
import {ListRow} from './list-row'
import {WallpaperPicker} from './wallpaper-picker'

export function SettingsContent() {
	const navigate = useNavigate()

	return (
		<motion.div
			className='animate-in fade-in'
			// initial={{ opacity: 0 }}
			// animate={{ opacity: 1 }}
			// transition={{ duration: 0.3, ease: "easeOut", delay: 1 }}
		>
			<div className='grid w-full gap-x-[30px] gap-y-[20px] lg:grid-cols-[280px_auto]'>
				<div className='flex items-center justify-center'>
					<DesktopPreviewFrame>
						<DesktopPreview />
					</DesktopPreviewFrame>
				</div>
				<Card className='flex flex-wrap items-center justify-between gap-y-5'>
					<div>
						<h2 className='text-24 font-bold lowercase leading-none -tracking-4'>
							Satoshi’s <span className='opacity-40'>Umbrel</span>
						</h2>
						<div className='pt-5' />
						<dl className='grid grid-cols-2 gap-x-5 gap-y-2 text-14 leading-none -tracking-2'>
							<dt className='opacity-40'>Running on</dt>
							<dd>Raspberry Pi 4</dd>
							<dt className='opacity-40'>umbrelOS version</dt>
							<dd>0.5.4 </dd>
						</dl>
					</div>
					<div className='flex w-full flex-col items-stretch gap-2.5 md:w-auto md:flex-row'>
						<IconLinkButton to='/settings/troubleshoot' size='xl' icon={RiToolsLine}>
							Troubleshoot
						</IconLinkButton>
						<IconLinkButton size='xl' icon={RiRestartLine} to='/settings/restart' preventScrollReset={true}>
							Restart
						</IconLinkButton>
						<IconLinkButton
							to='/settings/shutdown'
							preventScrollReset={true}
							size='xl'
							text='destructive'
							icon={RiShutDownLine}
						>
							Shut down
						</IconLinkButton>
					</div>
				</Card>
				<div className='flex flex-col gap-3'>
					<Card>
						<CardProgressStat
							title='Storage'
							value='256 GB'
							valueSub='/ 2 TB'
							secondaryValue='1.75 TB left'
							progress={0.75}
						/>
					</Card>
					<Card>
						<CardProgressStat
							title='Memory'
							value='5.4 GB'
							valueSub='/ 16 GB'
							secondaryValue='11.4 GB left'
							progress={0.75}
						/>
					</Card>
					<Card>
						<CardTempStat />
					</Card>
					<div className='mx-auto'>
						<IconLinkButton icon={RiPulseLine} to='/settings/live-usage' preventScrollReset={true}>
							Open Live Usage
						</IconLinkButton>
					</div>
					<div className='flex-1' />
					<div className='mx-auto text-12 font-normal text-white/70'>
						Need help?{' '}
						<Link className={linkClass} to={links.support}>
							Contact support.
						</Link>
					</div>
				</div>
				<Card className='umbrel-divide-y overflow-hidden py-2'>
					<ListRow title='Account' description='Your display name & Umbrel password'>
						<div className='flex flex-wrap gap-2'>
							<IconLinkButton to='/settings/change-name' preventScrollReset={true} icon={RiUserLine}>
								Change name
							</IconLinkButton>
							<IconLinkButton to='/settings/change-password' preventScrollReset={true} icon={RiKeyLine}>
								Change password
							</IconLinkButton>
						</div>
					</ListRow>
					<ListRow title='Wallpaper' description='Choose your Umbrel wallpaper'>
						{/* -mx-2 so that when last item is active, it right aligns with other list row buttons, and first item aligns on mobile when picker wrapped down */}
						{/* w-full to prevent overflow issues */}
						<div className='-mx-2 max-w-full'>
							<WallpaperPicker />
						</div>
					</ListRow>
					<ListRow title='Two-factor authentication' description='Add a layer of security to login' isLabel>
						<Switch onCheckedChange={() => navigate('/settings/2fa', {preventScrollReset: true})} />
					</ListRow>
					<ListRow title='Remote Tor access' description='Access Umbrel from anywhere using a Tor browser' isLabel>
						<Switch onCheckedChange={fixmeHandler} />
					</ListRow>
					<ListRow title='Migration Assistant' description='Move your data from Raspberry Pi to Umbrel Home' isLabel>
						{/* We could use an IconLinkButton but then the `isLabel` from `ListRow` wouldn't work */}
						<IconButton
							icon={RiExpandRightFill}
							onClick={() =>
								navigate('/settings/migration-assistant', {
									preventScrollReset: true,
								})
							}
						>
							Migrate
						</IconButton>
					</ListRow>
					{/* TODO: make clicking trigger the dropdown */}
					<ListRow title='Language' description='Select preferred language '>
						<LanguageDropdown />
					</ListRow>
					<ListRow title='App store' description='App store settings & app updates' isLabel>
						<IconButton
							icon={RiEqualizerLine}
							onClick={() =>
								navigate('/settings/app-store-preferences', {
									preventScrollReset: true,
								})
							}
						>
							Preferences
						</IconButton>
					</ListRow>
					<SoftwareUpdateListRow />
				</Card>
			</div>
		</motion.div>
	)
}
function SoftwareUpdateListRow() {
	const [checking, setChecking] = useState(false)

	const currentVersion = '0.5.4'
	const latestVersion = '1.2'

	const atLatest = (
		<span className='flex items-center gap-1'>
			<Icon component={RiCheckboxCircleFill} className='text-success' />
			You are on the latest version
		</span>
	)

	const updateAvailable = (
		<span className='flex items-center gap-1'>
			<Icon component={RiArrowUpCircleFill} className='text-brand' />
			New version {latestVersion} is available
		</span>
	)

	return (
		<>
			<ListRow title={`umbrelOS ${currentVersion}`} description={atLatest} isLabel>
				<Button onClick={() => setChecking((c) => !c)}>
					<Icon component={RiRefreshLine} className={checking ? 'animate-spin' : undefined} />
					Check for updates
				</Button>
			</ListRow>
			<ListRow title={`umbrelOS ${currentVersion}`} description={updateAvailable} isLabel>
				<Button variant='primary' onClick={() => setChecking((c) => !c)}>
					<Icon component={RiRefreshLine} className={checking ? 'animate-spin' : undefined} />
					Update now
				</Button>
			</ListRow>
		</>
	)
}

const languages = [
	{name: 'English', code: 'en'},
	{name: 'Français', code: 'fr'},
	{name: 'العربية', code: 'ar'},
]

function LanguageDropdown() {
	const {i18n} = useTranslation()
	const [activeCode, setActiveCode] = useLocalStorage('i18nextLng', 'en', {
		raw: true,
	})

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<IconButton icon={Globe} id='language'>
					{languages.find(({code}) => code === activeCode)?.name}
					<ChevronDown />
				</IconButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				{languages.map(({code, name}) => (
					<DropdownMenuCheckboxItem
						key={code}
						checked={activeCode === code}
						onSelect={() => {
							setActiveCode(code)
							i18n.changeLanguage(code)
						}}
					>
						{name}
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}