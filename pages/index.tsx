import type {NextPage} from 'next'
import Head from 'next/head'
import HCaptcha from '@hcaptcha/react-hcaptcha'
import {useState} from "react";
import Image from "next/image";
import Logo from '../public/logo.png'

type alertType = 'error' | 'success' | 'warning'

const Home: NextPage = () => {
  const [username, setUsername] = useState<string>()
  const [token, setToken] = useState<string>()
  const [type, setType] = useState<alertType>()
  const [response, setResponse] = useState<string>()
  const [loading, setLoading] = useState<boolean>(false)

  const onSubmit = () => {
    if (loading) return

    if (!username || username === '') {
      setType('warning')
      setResponse('Please enter a username')
      return
    }

    if (!token || token === '') {
      setType('warning')
      setResponse('Please complete the captcha')
      return
    }

    setLoading(true)
    fetch('https://verifybackend.6b6t.org/submit', {
      method: 'POST',
      body: JSON.stringify({
        username,
        token
      })
    }).then(r => r.json()).then(r => {
      setResponse(r.message)
      setType(r.type)
      setLoading(false)
    }).catch(e => {
      setResponse(e.message)
      setType('error')
      setLoading(false)
    })
  }

  return (
      <>
        <Head>
          <title>6b6t Verify</title>
          <meta name="description" content="Verify to be able to join 6b6t with a VPN/proxy!"/>
          <link rel="icon" href="/favicon.ico"/>
        </Head>

        <div className="hero w-screen min-h-screen h-full bg-base-200 overflow-hidden">
          <div className="p-2 md:p-4 hero-content flex-col lg:flex-row-reverse">
            <div className="text-center lg:text-left max-w-lg ml-4">
              <h1 className="text-5xl font-bold">Please verify!</h1>
              <div className="py-6 flex flex-col">
                <p className="mb-2 font-bold">To prevent malicious users and attacks, to play on 6b6t with a Proxy/VPN,
                  you must verify at this
                  website.</p>
                <h2 className="mb-1 font-bold text-lg">How to?</h2>
                <ol className="mb-2 list-decimal ml-4">
                  <li>Enter your username</li>
                  <li>Complete the captcha</li>
                  <li>Click the button</li>
                </ol>
                <p className="font-bold">Once you are successfully verified, you can join with a Proxy/VPN and during
                  attacks you can join
                  with no
                  issues as well.</p>
              </div>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                {
                    type === 'error' &&
                    <div className="alert alert-error shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6"
                                 fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span>{response}</span>
                        </div>
                    </div>
                }
                {
                    type === 'warning' &&
                    <div className="alert alert-warning shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6"
                                 fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span>{response}</span>
                        </div>
                    </div>
                }
                {
                    type === 'success' &&
                    <div className="alert alert-success shadow-lg">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6"
                                 fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span>{response}</span>
                        </div>
                    </div>
                }
                <div className="flex flex-row justify-center">
                  <div className="mx-auto">
                    <Image alt="6b6t Logo" src={Logo} width={92} height={92}/>
                  </div>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Username</span>
                  </label>
                  <input type="text" onInput={(e) => setUsername(e.currentTarget.value)} placeholder="Type here"
                         className="input input-bordered"/>
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Captcha</span>
                  </label>
                  <HCaptcha theme="dark" sitekey="3d6cd239-c3b5-4524-bdaa-0c93704eedb2" onVerify={setToken}/>
                </div>
                <div className="form-control mt-6">
                  <button className={"btn btn-primary" + (loading ? " loading" : "")} onClick={onSubmit}>Verify</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  )
}

export default Home
