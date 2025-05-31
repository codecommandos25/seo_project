import {
  IconBarrierBlock,
  IconBrowserCheck,
  IconBug,
  IconChecklist,
  IconError404,
  IconLayoutDashboard,
  IconLock,
  IconLockAccess,
  IconServerOff,
  IconTool,
  IconUserOff,
} from '@tabler/icons-react'
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Marketer',
      logo: Command,
      plan: 'Free Plan',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'SEO',
      items: [
        {
          title: 'SEO Dashboard',
          url: '/seo',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Keyword Analysis',
          url: '/seo/keyword-analysis',
          icon: IconChecklist,
        },
        {
          title: "Backlink Analysis",
          url: '/seo/backlink-analysis',
          icon: IconBrowserCheck,
        },
        {
          title: "Technical Analysis",
          // url: '/seo/technical-analysis',
          icon: IconTool,
          items: [
            {
              title: 'Crawled Pages',
              url: '/seo/technical-analysis/crawled-pages',
            },
            // {
            //   title: 'Indexability',
            //   url: '/seo/technical-analysis/indexability',
            // },
            {
              title: 'Website Speed',
              url: '/seo/technical-analysis/website-speed',
            }
          ]
        },
        {
          title: 'On Page SEO',
          url: '/seo/on-page',
          icon: IconTool,
        }
      ],
    },
    {
      title: 'Social Media',
      items: [
        {
          title: 'Instagram',
          icon: IconLayoutDashboard,
          url: '/social-media/instagram',
        },
        {
          title: 'Facebook',
          icon: IconLayoutDashboard,
          url: '/social-media/facebook',
        },
        {
          title: 'LinkedIn',
          icon: IconLayoutDashboard,
          url: '/social-media/linkedin'
        },
        {
          title: 'YouTube',
          icon: IconLayoutDashboard,
          url: '/social-media/youtube',
        }

      ],
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Auth',
          icon: IconLockAccess,
          items: [
            {
              title: 'Sign In',
              url: '/sign-in',
            },
            {
              title: 'Sign Up',
              url: '/sign-up',
            },
            {
              title: 'Forgot Password',
              url: '/forgot-password',
            },
            {
              title: 'OTP',
              url: '/otp',
            },
          ],
        },
        {
          title: 'Errors',
          icon: IconBug,
          items: [
            {
              title: 'Unauthorized',
              url: '/401',
              icon: IconLock,
            },
            {
              title: 'Forbidden',
              url: '/403',
              icon: IconUserOff,
            },
            {
              title: 'Not Found',
              url: '/404',
              icon: IconError404,
            },
            {
              title: 'Internal Server Error',
              url: '/500',
              icon: IconServerOff,
            },
            {
              title: 'Maintenance Error',
              url: '/503',
              icon: IconBarrierBlock,
            },
          ],
        },
      ],
    },
  ],
}
