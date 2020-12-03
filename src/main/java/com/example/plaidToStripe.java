package com.example;

import com.plaid.client.PlaidClient;
import com.plaid.client.request.AccountsGetRequest;
import com.plaid.client.request.ItemPublicTokenExchangeRequest;
import com.plaid.client.request.ItemStripeTokenCreateRequest;
import com.plaid.client.response.Account;
import com.plaid.client.response.AccountsGetResponse;
import com.plaid.client.response.ItemPublicTokenExchangeResponse;
import com.plaid.client.response.ItemStripeTokenCreateResponse;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Charge;
import com.stripe.model.Customer;
import com.stripe.model.CustomerCollection;

import retrofit2.Response;

public class plaidToStripe {

    public static String[] getTokens(String publicToken, String accountId) throws IOException {
        String[] tokenArray = new String[2];

        // Using Plaid's Java bindings (https://github.com/plaid/plaid-java)
        // Use builder to create a client
        PlaidClient plaidClient = PlaidClient.newBuilder()
                .clientIdAndSecret(System.getenv("PLAID_CLIENT_ID"), System.getenv("PLAID_SECRET_SANDBOX"))
                .publicKey(System.getenv("PLAID_PUBLIC_KEY")).sandboxBaseUrl() // Use the Sandbox.
                .build();

        // Required request parameters are always Request object constructor arguments
        Response<ItemPublicTokenExchangeResponse> exchangeResponse = plaidClient.service()
                .itemPublicTokenExchange(new ItemPublicTokenExchangeRequest(publicToken)).execute();
        System.out.println(exchangeResponse);
        if (exchangeResponse.isSuccessful()) {
            System.out.println("Success:");
            String accessToken = exchangeResponse.body().getAccessToken();
            // Pull the accounts associated with the Item
            Response<AccountsGetResponse> response = plaidClient.service()
                    .accountsGet(new AccountsGetRequest(accessToken)).execute();
            List<Account> accounts = response.body().getAccounts();
            tokenArray[0] = accounts.get(accounts.size() - 1).getOfficialName();
            System.out.println(accounts.size());
            System.out.println(tokenArray[0]);
            Response<ItemStripeTokenCreateResponse> stripeResponse = plaidClient.service()
                    .itemStripeTokenCreate(new ItemStripeTokenCreateRequest(accessToken, accountId)).execute();

            if (stripeResponse.isSuccessful()) {
                String bankAccountToken = stripeResponse.body().getStripeBankAccountToken();
                tokenArray[1] = bankAccountToken;
            }
            return tokenArray;
        }
        return tokenArray;
    }

    // public static void main(String[] args) throws IOException, StripeException {
    // Stripe.apiKey = "sk_test_3gCJKshMgnQKkUBMp6tGu0O400rZYqWFNG";
    // Customer customer = Customer.retrieve("cus_HK3QhC0QXeP92L");
    // Map<String, Object> params1 = new HashMap<>();
    // // params.put();
    // Customer customer1 = Customer.create(params1);

    // // System.out.println(customer1.getSources());

    // System.out.println("sources");
    // System.out.println(customer.getSources());

    // Map<String, Object> params = new HashMap<>();
    // params.put("amount", 2000);
    // params.put("currency", "usd");
    // params.put("customer", "cus_HK3QhC0QXeP92L");
    // Charge charge = Charge.create(params);
    // System.out.println("charge");
    // System.out.println(charge);
    // System.out.println("customer");
    // System.out.println(customer);

    // // Map<String, Object> params = new HashMap<>();
    // // params.put("limit", 3);

    // // CustomerCollection customers = Customer.list(params);
    // // List<Customer> cusList = customers.getData();
    // // System.out.println(cusList.get(0).getId());
    // }
}