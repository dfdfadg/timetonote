---
title: "Why Is My Printer Offline? How to Get It Back Online Fast"
seoTitle: "Why Is My Printer Offline? 10 Easy Fixes That Work"
shortTitle: "Printer offline"
slug: why-is-my-printer-offline
category: internet-apps
description: "Printer says offline even though it is on? Learn why it happens and how to fix it on Windows and Mac, from restarting to clearing the print queue."
author: agha-ali-abbas
publishedAt: 2026-09-26
updatedAt: 2026-09-27
featuredImage:
  src: /images/articles/why-is-my-printer-offline.webp
  alt: "Illustration of a printer with a Wi-Fi symbol and a red offline mark"
tags: [printer, wifi, windows, mac, troubleshooting]
relatedArticles: [why-is-my-wifi-not-working, why-is-my-laptop-so-slow]
sources:
  - title: "HP Support: Printer offline issues"
    url: "https://support.hp.com/us-en/help/printer/printer-offline"
  - title: "Canon USA: Resolve printer is offline or not responding (Windows)"
    url: "https://support.usa.canon.com/kb/s/article/ART180034"
faq:
  - question: "Why does my printer say offline when it is on?"
    answer: "Your computer shows a printer as offline when it cannot talk to it. This usually happens because the printer lost its Wi-Fi connection, the printer's network address changed, a stuck print job is blocking the queue, or Windows has Use Printer Offline turned on."
  - question: "How do I get my printer back online on Windows?"
    answer: "Restart the printer and computer, then go to Settings > Bluetooth & devices > Printers & scanners. Select your printer, open the print queue, click the Printer menu, and make sure Use Printer Offline is not checked. Then clear any stuck print jobs."
  - question: "Why does my printer keep going offline?"
    answer: "A printer that keeps going offline often has a weak Wi-Fi signal, goes into a deep sleep mode, or gets a new network address from the router every so often. Move the printer closer to the router, turn off deep sleep if possible, and ask your router to always give the printer the same address."
  - question: "Does my printer need to be on the same Wi-Fi as my computer?"
    answer: "Yes. For a Wi-Fi printer, your computer or phone and the printer must be on the same network. Guest networks and some mesh or extender setups keep devices apart, which can make the printer look offline."
---

A printer shows as **offline** when your computer **cannot talk to it**. The most common reasons are that the printer **lost its Wi-Fi connection**, a **stuck print job** is blocking the queue, the printer's **network address changed**, or Windows has **"Use Printer Offline"** turned on by mistake.

The fix is often simple: restart everything, make sure the printer and computer are on the same Wi-Fi, and clear the print queue. This guide walks you through each step on **Windows** and **Mac**, from the quickest fixes to the ones that take a little longer.

## Quick fixes to try first

These steps fix most offline printers in a few minutes.

1. **Check the basics.** Make sure the printer is on, has paper and ink or toner, and shows no error lights or messages.
2. **Restart the printer.** Turn it off, unplug it for 30 seconds, and turn it back on.
3. **Restart your computer.**
4. **Restart your Wi-Fi router** if other devices are having trouble too.
5. **Try printing again.**

If it still says offline, keep going.

## 10 reasons your printer is offline (and how to fix them)

### 1. The printer lost its Wi-Fi connection

Wi-Fi printers can drop off the network after a power outage, a router restart, or a Wi-Fi password change.

**How to check:** Look at the printer's screen or network light. Many printers can print a **network status report** or **network configuration page** from their settings menu. It shows whether the printer is connected and which network it is on.

**Fix:**

- Reconnect the printer to Wi-Fi using its control panel or the maker's app (such as HP Smart, Canon PRINT, Epson Smart Panel, or Brother Mobile Connect).
- If you changed your Wi-Fi password, enter the new one on the printer.
- Move the printer closer to the router if the signal is weak.

If your Wi-Fi itself is acting up, our guide on [fixing Wi-Fi that stopped working](/why-is-my-wifi-not-working) can help.

### 2. The printer and computer are on different networks

Your computer and printer must be on the **same network**. Many homes have more than one: a guest network, a 5 GHz network, or a network from a range extender.

**Fix:**

- Check which Wi-Fi network your computer is using.
- Check which network the printer is using (from the network report).
- Put them on the same one. Avoid **guest networks**, which often block devices from seeing each other.

**Tip:** Many printers only work on **2.4 GHz** Wi-Fi. If your router has separate 2.4 GHz and 5 GHz names, connect the printer to the 2.4 GHz one. Your computer can still use 5 GHz as long as both are part of the same home network.

### 3. "Use Printer Offline" is turned on (Windows)

Windows has a setting that makes a printer work offline on purpose. It can get turned on by accident.

**Fix:**

1. Go to **Settings > Bluetooth & devices > Printers & scanners**.
2. Click your printer.
3. Click **Open print queue**.
4. Click the **Printer** menu at the top.
5. If **Use Printer Offline** has a check mark, click it to turn it off.

### 4. A print job is stuck in the queue

One stuck print job can block everything behind it and make the printer look offline.

**Fix on Windows:**

1. Open the print queue (see the steps above).
2. Click the **Printer** menu and choose **Cancel All Documents**.
3. If jobs will not clear, restart the **Print Spooler**:
   - Press **Windows + R**, type **services.msc**, and press Enter.
   - Find **Print Spooler** in the list.
   - Right-click it and choose **Restart**.

**Fix on Mac:**

1. Go to **System Settings > Printers & Scanners**.
2. Click your printer, then **Printer Queue**.
3. Delete any stuck jobs.

### 5. The wrong printer is set as default

If you have more than one printer, or an old printer still listed, your computer may be sending jobs to the wrong one.

**Fix on Windows:** In **Printers & scanners**, turn off **Let Windows manage my default printer**. Then click your printer and choose **Set as default**.

**Fix on Mac:** In **Printers & Scanners**, choose your printer from the **Default printer** menu.

### 6. The printer's network address changed

Your router gives every device an **IP address**, like a house number on your network. Sometimes the router gives the printer a new address. If your computer is still looking at the old one, the printer shows as offline.

**Fix:**

- **Remove and re-add the printer** on your computer (see step 8). It will find the new address.
- To stop this from happening again, set up a **reserved IP address** (sometimes called DHCP reservation) for the printer in your router's app or settings page. This gives the printer the same address every time.

### 7. The driver or printer software is out of date

The **driver** is the software that lets your computer talk to the printer. An old or damaged driver can make the printer look offline, especially after a big Windows or macOS update.

**Fix:**

- Download the latest driver or software from the printer maker's website (HP, Canon, Epson, Brother, and others).
- On Windows, you can also check **Settings > Windows Update > Advanced options > Optional updates** for printer drivers.
- Update the printer's own **firmware** from its settings menu or app.

### 8. The printer setup on your computer is damaged

Sometimes the saved printer setup on your computer gets mixed up. Removing it and adding it again gives you a fresh start.

**On Windows:**

1. Go to **Settings > Bluetooth & devices > Printers & scanners**.
2. Click your printer and choose **Remove**.
3. Restart your computer.
4. Click **Add device** and select your printer when it appears.

**On Mac:**

1. Go to **System Settings > Printers & Scanners**.
2. Select the printer and click the **minus (-)** button, or right-click and choose **Remove Printer**.
3. Click **Add Printer, Scanner, or Fax** and add it again.

**Mac tip:** If printing is still broken, right-click (or Control-click) in the printer list and choose **Reset printing system**. This removes all printers, so you will need to add yours again.

### 9. The printer is in deep sleep

Many printers go into a deep sleep mode to save power. Some do not wake up when a print job arrives over Wi-Fi.

**Fix:** Press a button on the printer to wake it up and try again. In the printer's settings, look for **Sleep**, **Auto Off**, or **Energy Saver** options. Make the sleep delay longer or turn off **Auto Off**.

### 10. A VPN, firewall, or security app is blocking it

A **VPN** can hide your home network from your computer. Some firewalls and security apps also block printers.

**Fix:** Turn off the VPN and try printing. If that works, check your VPN's settings for an option to allow **local network access** or **LAN access**. Check your security app's settings for printer or network sharing options.

## Use the built-in troubleshooter

- **Windows:** Go to **Settings > System > Troubleshoot > Other troubleshooters** and run the **Printer** troubleshooter. On some versions, it opens in the **Get Help** app.
- **Printer maker tools:** HP, Canon, Epson, and Brother all have free apps or tools that can find and fix connection problems.

## Printer offline on your phone or tablet?

Phones and tablets print over Wi-Fi, so the same rules apply.

- **Check the Wi-Fi network.** Your phone must be on the same network as the printer. Turn off mobile data for a moment to make sure it is using Wi-Fi.
- **iPhone and iPad:** Most Wi-Fi printers support **AirPrint**. Tap the **Share** button, then **Print**, and choose your printer. If it does not appear, restart the printer and your iPhone.
- **Android:** Go to **Settings** and search for **Printing** or **Default print service**. Make sure the print service for your printer brand is turned on, or install the maker's app.
- **Use the maker's app.** Apps like HP Smart, Canon PRINT, and Epson Smart Panel can find the printer and fix many connection problems.

If the printer works from your phone but not from your computer, the problem is on the computer, not the printer.

## USB printer showing offline?

If your printer connects with a USB cable:

- Unplug the cable from both ends and plug it back in firmly.
- Try a different USB port on your computer.
- Try a different USB cable. Cables do wear out.
- Avoid USB hubs. Plug the printer directly into the computer.

## At a glance

| What you notice | Most likely cause | Try this first |
| --- | --- | --- |
| Offline after a power outage or router restart | Printer lost Wi-Fi | Restart printer; reconnect to Wi-Fi |
| Works from one device but not another | Different networks | Put both on the same Wi-Fi |
| Offline on Windows only | "Use Printer Offline" or stuck queue | Uncheck it; cancel all documents |
| Goes offline every few days | Changing IP address or weak signal | Reserve an IP; move closer to router |
| Offline after a computer update | Old driver | Install the latest driver from the maker |
| Offline only when VPN is on | VPN blocking local devices | Allow local network access or turn VPN off |

## How to stop your printer from going offline

- **Reserve an IP address** for the printer in your router settings.
- **Keep the printer close to the router**, or use a wired Ethernet connection if it has a port.
- **Keep drivers and firmware updated.**
- **Remove old printers** you no longer use from your computer.
- **Turn off Auto Off** or lengthen the sleep time.
- **Do not use a guest network** for the printer.

## Wired printers: an easy, reliable option

If your printer has an **Ethernet port**, plugging it straight into your router with a network cable can end offline problems for good. Wired connections do not drop out like Wi-Fi, and the printer is still shared with every device in your home. This is a great choice if the printer sits near the router.

## When to contact the printer maker

Contact the maker's support team if:

- The printer cannot connect to Wi-Fi at all, even next to the router
- It shows an error code you cannot clear
- It is offline on every device after all these steps
- It is still under warranty

## The short version

A printer shows offline when your computer cannot reach it. Restart the printer, computer, and router first. Then make sure both are on the same Wi-Fi network, turn off "Use Printer Offline" on Windows, and clear stuck print jobs. If that does not work, remove and re-add the printer and update its driver. To stop it from happening again, keep the printer close to the router and reserve its IP address.
