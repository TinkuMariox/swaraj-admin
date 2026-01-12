import { AdminLayout } from '@/components/layout/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: 'Account & Billing',
      items: [
        {
          question: 'How do I create an account?',
          answer: 'You can create an account by clicking the Sign Up button on the login page. Fill in your details and follow the verification process.',
        },
        {
          question: 'What is your billing cycle?',
          answer: 'We offer monthly and annual billing cycles. You can choose your preferred billing period during signup or change it anytime in your account settings.',
        },
        {
          question: 'Can I change my subscription plan?',
          answer: 'Yes, you can upgrade or downgrade your plan anytime from the Settings page. Changes take effect immediately.',
        },
        {
          question: 'Is there a free trial available?',
          answer: 'Yes, we offer a 14-day free trial for all new users. No credit card required to get started.',
        },
      ],
    },
    {
      category: 'Products & Orders',
      items: [
        {
          question: 'How do I add a new product?',
          answer: 'Go to the Products section and click "Add New Product". Fill in the product details including name, description, price, and images.',
        },
        {
          question: 'Can I track customer orders?',
          answer: 'Yes, all orders are tracked in the Orders section. You can view order status, customer details, and shipping information.',
        },
        {
          question: 'How do I manage inventory?',
          answer: 'Inventory is managed through the Products section. You can set stock levels, track usage, and get low-stock alerts.',
        },
        {
          question: 'Can I delete a product?',
          answer: 'Yes, you can delete products from the Products page. Deleted products cannot be recovered, so proceed carefully.',
        },
      ],
    },
    {
      category: 'Transactions & Payments',
      items: [
        {
          question: 'How do I view my transactions?',
          answer: 'All transactions are available in the Transactions section. You can filter by date, status, and amount.',
        },
        {
          question: 'What payment methods do you support?',
          answer: 'We support credit cards, debit cards, digital wallets, and bank transfers. All payments are securely processed.',
        },
        {
          question: 'How long does a refund take?',
          answer: 'Refunds are processed within 5-7 business days. The refund amount will be credited back to the original payment method.',
        },
        {
          question: 'Can I download invoices?',
          answer: 'Yes, you can download invoices from the Transactions section. Click on any transaction to view and download the invoice.',
        },
      ],
    },
    {
      category: 'Security & Privacy',
      items: [
        {
          question: 'Is my data secure?',
          answer: 'Yes, we use industry-standard encryption and security protocols to protect your data. All communications are encrypted with SSL/TLS.',
        },
        {
          question: 'How do I enable two-factor authentication?',
          answer: 'Go to Settings > Security and enable two-factor authentication. You can choose between SMS or email verification.',
        },
        {
          question: 'What is your data retention policy?',
          answer: 'We retain your data as long as your account is active. After account deletion, data is securely purged within 30 days.',
        },
        {
          question: 'Can I export my data?',
          answer: 'Yes, you can export all your data in CSV format from the Settings page. This includes products, orders, and customer information.',
        },
      ],
    },
  ];

  return (
    <AdminLayout title="FAQs">
      <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mt-2">Find answers to common questions about our platform</p>
      </div>

      <div className="space-y-8">
        {faqs.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <h2 className="text-2xl font-bold mb-4 text-primary">{section.category}</h2>
            <div className="space-y-3">
              {section.items.map((faq, itemIndex) => {
                const globalIndex = sectionIndex * 100 + itemIndex;
                const isOpen = openIndex === globalIndex;

                return (
                  <Card key={itemIndex} className="hover:shadow-md transition-shadow">
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                      className="w-full text-left"
                    >
                      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-3">
                        <CardTitle className="text-base font-semibold pr-4">
                          {faq.question}
                        </CardTitle>
                        <div className="flex-shrink-0">
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                      </CardHeader>
                    </button>

                    {isOpen && (
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <Card className="bg-muted/50 border-primary/20">
        <CardHeader>
          <CardTitle>Couldn't find what you're looking for?</CardTitle>
          <CardDescription>Our support team is here to help</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            If you couldn't find the answer you're looking for, please contact our support team.
          </p>
          <Button>Contact Support</Button>
        </CardContent>
      </Card>
      </div>
    </AdminLayout>
  );
};

export default FAQs;
