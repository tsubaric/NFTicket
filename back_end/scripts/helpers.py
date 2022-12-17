from brownie import network, accounts

def get_account():
    current_network = network.show_active()
    if current_network == 'goerli':
        return accounts.load('mm-dev')
    else:
        return accounts[0]
