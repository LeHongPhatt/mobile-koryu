import React from 'react';
import Svg, {Circle, ClipPath, Defs, G, Path, Rect} from 'react-native-svg';

const TabBar = {
  Home: ({
    color = '#ADB3BC',
    width = '24',
    height = '23',
    viewBox = '0 0 24 23',
    fill = 'none',
    xmlns = 'http://www.w3.org/2000/svg',
  }) => (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fill}
      xmlns={xmlns}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.3078 0.386679L23.9594 9.37157H23.9588C24.0873 9.48016 24.1794 9.62561 24.2225 9.78823C24.2657 9.95086 24.2579 10.1228 24.2001 10.2808C24.1424 10.4389 24.0375 10.5754 23.8996 10.6718C23.7618 10.7683 23.5976 10.8201 23.4294 10.8203H20.6124V22.1414C20.6124 22.3135 20.544 22.4785 20.4224 22.6002C20.3007 22.7218 20.1357 22.7902 19.9636 22.7902H14.5814V18.6302C14.5814 18.3135 14.5169 18.0002 14.3918 17.7092C14.2667 17.4183 14.0837 17.1558 13.8538 16.938C13.624 16.7201 13.3522 16.5513 13.055 16.4419C12.7577 16.3325 12.4414 16.2849 12.1251 16.3018C11.5141 16.3559 10.9464 16.6401 10.537 17.0968C10.1275 17.5535 9.90669 18.1487 9.91928 18.7619V22.7902H4.53704C4.36497 22.7902 4.19995 22.7218 4.07828 22.6002C3.95661 22.4785 3.88826 22.3135 3.88826 22.1414V10.8203H1.07063C0.902376 10.8201 0.738227 10.7683 0.600381 10.6718C0.462536 10.5754 0.357645 10.4389 0.299896 10.2808C0.242146 10.1228 0.234323 9.95086 0.277486 9.78823C0.320648 9.62561 0.412713 9.48016 0.54123 9.37157L11.1909 0.386679C11.487 0.136964 11.862 0 12.2494 0C12.6367 0 13.0117 0.136964 13.3078 0.386679ZM15.1738 11.3952C15.1738 13.0097 13.8649 14.3185 12.2504 14.3185C10.6358 14.3185 9.32699 13.0097 9.32699 11.3952C9.32699 9.78062 10.6358 8.47178 12.2504 8.47178C13.8649 8.47178 15.1738 9.78062 15.1738 11.3952Z"
        fill={color}
      />
    </Svg>
  ),
  Chat: ({
    color = '#ADB3BC',
    width = '24',
    height = '24',
    viewBox = '0 0 24 24',
    fill = 'none',
    xmlns = 'http://www.w3.org/2000/svg',
  }) => (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill={fill}
      xmlns={xmlns}>
      <G clipPath="url(#clip0_897_16763)">
        <Path
          d="M9.89044 7.26562C4.46264 7.26562 4.93638e-05 10.9981 4.93638e-05 15.5862C4.93638e-05 17.4202 0.711424 19.2841 2.016 20.7287L0.173768 22.8339C-0.00749751 23.0413 -0.0514663 23.3359 0.0632369 23.5872C0.177237 23.8385 0.427174 23.9999 0.703174 23.9999H10.5936C14.6011 23.9999 19.7808 20.5489 19.7808 15.5862C19.7808 10.9981 15.3182 7.26562 9.89044 7.26562ZM5.62491 16.875C4.84969 16.875 4.21871 16.244 4.21871 15.4688C4.21871 14.6936 4.84974 14.0626 5.62491 14.0626C6.40008 14.0626 7.03111 14.6936 7.03111 15.4688C7.03116 16.244 6.40013 16.875 5.62491 16.875ZM9.89044 16.875C9.11522 16.875 8.48424 16.244 8.48424 15.4688C8.48424 14.6936 9.11527 14.0626 9.89044 14.0626C10.6656 14.0626 11.2966 14.6936 11.2966 15.4688C11.2966 16.244 10.6657 16.875 9.89044 16.875ZM14.156 16.875C13.3808 16.875 12.7498 16.244 12.7498 15.4688C12.7498 14.6936 13.3808 14.0626 14.156 14.0626C14.9311 14.0626 15.5622 14.6936 15.5622 15.4688C15.5622 16.244 14.9312 16.875 14.156 16.875Z"
          fill={color}
        />
        <Path
          d="M23.8299 14.3073L22.1745 12.3758C23.3561 11.0424 23.9995 9.41639 23.9995 7.73419C23.9995 3.46955 19.899 0 14.8591 0C10.3017 0 6.42977 2.84011 5.74609 6.53672C7.01772 6.10462 8.4438 5.859 9.8905 5.859C16.0477 5.859 21.1063 10.1595 21.1802 15.4684H23.2964C23.897 15.4684 24.2196 14.7612 23.8299 14.3073Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_897_16763">
          <Rect width={width} height={height} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  ),
  Scan: ({
    color = '#EADA8F',
    width = '51',
    height = '50',
    viewBox = '0 0 51 50',
    fill = 'white',
    fillOpacity = '0.4',
    xmlns = 'http://www.w3.org/2000/svg',
  }) => (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns={xmlns}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.5 50C39.3071 50 50.5 38.8071 50.5 25C50.5 11.1929 39.3071 0 25.5 0C11.6929 0 0.5 11.1929 0.5 25C0.5 38.8071 11.6929 50 25.5 50Z"
        fill={color}
      />
      <Path
        d="M36.7498 17.4998V13.75H33C32.3096 13.75 31.75 13.1904 31.75 12.5C31.75 11.8096 32.3096 11.25 33 11.25H37.3745C38.4101 11.25 39.2498 12.094 39.2498 13.1253V17.4998C39.2498 18.1902 38.6902 18.7498 37.9998 18.7498C37.3094 18.7498 36.7498 18.1902 36.7498 17.4998Z"
        fill={fill}
        fillOpacity={fillOpacity}
      />
      <Path
        d="M17.9998 13.75H14.25V17.4998C14.25 18.1902 13.6904 18.7498 13 18.7498C12.3096 18.7498 11.75 18.1902 11.75 17.4998V13.1253C11.75 12.094 12.5897 11.25 13.6253 11.25H17.9998C18.6902 11.25 19.2498 11.8096 19.2498 12.5C19.2498 13.1904 18.6902 13.75 17.9998 13.75Z"
        fill={fill}
        fillOpacity={fillOpacity}
      />
      <Path
        d="M14.25 32.5V36.2498H17.9998C18.6902 36.2498 19.2498 36.8094 19.2498 37.4998C19.2498 38.1902 18.6902 38.7498 17.9998 38.7498H13.6253C12.5897 38.7498 11.75 37.9058 11.75 36.8745V32.5C11.75 31.8096 12.3096 31.25 13 31.25C13.6904 31.25 14.25 31.8096 14.25 32.5Z"
        fill={fill}
        fillOpacity={fillOpacity}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36 25C36 25.5523 35.5765 26 35.0456 26H15.9544C15.4273 26 15 25.5561 15 25C15 24.4477 15.4235 24 15.9544 24H35.0456C35.5727 24 36 24.4439 36 25Z"
        fill="white"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.5 35.5C24.9477 35.5 24.5 35.0765 24.5 34.5456L24.5 15.4544C24.5 14.9273 24.9439 14.5 25.5 14.5C26.0523 14.5 26.5 14.9235 26.5 15.4544L26.5 34.5456C26.5 35.0727 26.0561 35.5 25.5 35.5Z"
        fill="white"
      />
      <Path
        d="M33 36.2498H36.7498V32.5C36.7498 31.8096 37.3094 31.25 37.9998 31.25C38.6902 31.25 39.2498 31.8096 39.2498 32.5V36.8745C39.2498 37.9058 38.4101 38.7498 37.3745 38.7498H33C32.3096 38.7498 31.75 38.1902 31.75 37.4998C31.75 36.8094 32.3096 36.2498 33 36.2498Z"
        fill={fill}
        fillOpacity={fillOpacity}
      />
    </Svg>
  ),
  Label: ({
    color = '#ADB3BC',
    width = '29',
    height = '29',
    viewBox = '0 0 29 29',
    xmlns = 'http://www.w3.org/2000/svg',
  }) => (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns={xmlns}>
      <Path
        d="M12 27C12.682 27 13.336 26.7366 13.8183 26.2678C14.3005 25.799 14.5714 25.1631 14.5714 24.5001H9.42857C9.42857 25.1631 9.69949 25.799 10.1817 26.2678C10.664 26.7366 11.318 27 12 27ZM13.2793 8.37477C13.2972 8.20097 13.2775 8.02545 13.2214 7.85951C13.1653 7.69358 13.074 7.54093 12.9535 7.41139C12.8329 7.28186 12.6858 7.17833 12.5216 7.10747C12.3573 7.03661 12.1797 7 12 7C11.8203 7 11.6427 7.03661 11.4784 7.10747C11.3142 7.17833 11.1671 7.28186 11.0465 7.41139C10.926 7.54093 10.8347 7.69358 10.7786 7.85951C10.7225 8.02545 10.7028 8.20097 10.7207 8.37477C9.2675 8.66213 7.96108 9.42891 7.0227 10.5453C6.08431 11.6616 5.57162 13.059 5.57143 14.5007C5.57143 15.8731 4.92857 22.0003 3 23.2502H21C19.0714 22.0003 18.4286 15.8731 18.4286 14.5007C18.4286 11.4758 16.2171 8.95099 13.2793 8.37477Z"
        fill={color}
      />
      <Circle cx="20.875" cy="8" r="8" fill="#FF375F" />
      <Path
        d="M16.1406 9.11719H17.8672V10.8438H18.6406V9.11719H20.3711V8.33984H18.6406V6.61328H17.8672V8.33984H16.1406V9.11719ZM23.3789 5.22656C22.1953 5.22656 21.3359 6.05469 21.3359 7.1875V7.19531C21.3359 8.27344 22.1094 9.07031 23.1836 9.07031C23.9492 9.07031 24.4609 8.66797 24.6641 8.21484H24.7422C24.7227 9.39844 24.3359 10.3945 23.3477 10.3945C22.8203 10.3945 22.4531 10.1211 22.293 9.69141L22.2812 9.65234H21.4102L21.4219 9.69922C21.6055 10.5508 22.3477 11.1367 23.3477 11.1367C24.7422 11.1367 25.5742 10.0117 25.5742 8.10156V8.09375C25.5742 6.02344 24.5078 5.22656 23.3789 5.22656ZM23.375 8.36328C22.6953 8.36328 22.1992 7.86328 22.1992 7.17188V7.16406C22.1992 6.48828 22.7266 5.96094 23.3867 5.96094C24.0508 5.96094 24.5703 6.5 24.5703 7.1875V7.19141C24.5703 7.87109 24.0508 8.36328 23.375 8.36328Z"
        fill="white"
      />
    </Svg>
  ),
  Account: ({
    color = '#ADB3BC',
    width = '24',
    height = '24',
    viewBox = '0 0 24 24',
    xmlns = 'http://www.w3.org/2000/svg',
  }) => (
    <Svg
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns={xmlns}>
      <G clipPath="url(#clip0_897_16791)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.375 12C0.375 5.59013 5.58975 0.375 12 0.375C18.4102 0.375 23.625 5.59013 23.625 12C23.625 18.4099 18.4102 23.625 12 23.625C5.58975 23.625 0.375 18.4099 0.375 12ZM5.32913 19.5793C7.17263 21.0159 9.48713 21.875 12 21.875C14.5125 21.875 16.827 21.0163 18.6705 19.5796C17.5916 17.7463 15.6499 16.625 13.5 16.625H10.5C8.3475 16.625 6.40575 17.7463 5.32913 19.5793ZM12.1875 14.375C14.155 14.375 15.75 12.78 15.75 10.8125C15.75 8.84499 14.155 7.25 12.1875 7.25C10.22 7.25 8.625 8.84499 8.625 10.8125C8.625 12.78 10.22 14.375 12.1875 14.375Z"
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_897_16791">
          <Rect width={width} height={height} fill="white" />
        </ClipPath>
      </Defs>
    </Svg>
  ),
};

export default TabBar;