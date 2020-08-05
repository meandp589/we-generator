DEMO [PROJECT STRUCTURE]
├── conf                                    # App configuration
│   └── config.json                         # Static config (routing, static value)
├── logs                                    # Output log path
│   ├── appLog                              # appLog file
│   ├── detail                              # detailLog file
│   ├── stat                                # statLog file
│   └── summary                             # summaryLog file
├── node_modules                            # Node packages/modules
│   └── ...                                 # 
├── src                                     # 
│   ├── config                              # App configuration
│   │   ├── commonlog-kb.js                 # Initial config commonlog
│   │   ├── express.js                      # Initial app config
│   │   └── ...                             # 
│   ├── modules                             # 
│   │   ├── command1                        # 
│   │   │   ├── command1.ctrl.js            # command1 controller business/logic
│   │   │   └── command1.route.js           # command1 routing config
│   │   ├── command2                        # 
│   │   │   ├── command2.ctrl.js            # command2 controller business/logic
│   │   │   └── command2.route.js           # command2 routing config
│   │   └── ...                             # Other command
│   ├── service                             # Util libs (validation, http-service, etc)
│   │   ├── http-service                    # Make http requests
│   │   └── ...                             # 
│   └── utils                               # Util libs (validation, http-service, etc)
│       ├── enum                            # App constants (constants value, stat, http-status, etc)
│       │   └── ...                         # 
│       └── ...                             # 
├── index.js                                # App starting point
├── pm2.json                                # pm2 init
├── package.json                            #
└── README.md                               #